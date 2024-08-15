#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
EXIT_CODE=0

usage()
{
    echo "Usage: $0 host:port [-s] [-t timeout] [-- command args]"
    echo "  -h HOST | --host=HOST       Host or IP under test"
    echo "  -p PORT | --port=PORT       TCP port under test"
    echo "  -s | --strict               Only execute subcommand if the test succeeds"
    echo "  -q | --quiet                Don't output any status messages"
    echo "  -t TIMEOUT | --timeout=TIMEOUT Timeout in seconds, zero for no timeout"
    echo "  -- COMMAND ARGS             Execute command with args after the test finishes"
    echo ""
    echo "Examples:"
    echo "  $0 google.com:80 -- echo 'Google is up'"
    echo "  $0 -q --strict google.com:80 -- echo 'Google is up'"
    exit 1
}

wait_for()
{
    if [[ "${TIMEOUT}" -gt 0 ]]; then
        echo "Waiting ${TIMEOUT} seconds for ${HOST}:${PORT}"
    else
        echo "Waiting for ${HOST}:${PORT} without a timeout"
    fi
    start_ts=$(date +%s)
    while :
    do
        if [[ "${QUIET}" -eq 0 ]]; then
            echo "Trying ${HOST}:${PORT}..."
        fi
        nc -z "${HOST}" "${PORT}" > /dev/null 2>&1
        result=$?
        if [[ $result -eq 0 ]]; then
            end_ts=$(date +%s)
            echo "${HOST}:${PORT} is available after $((end_ts - start_ts)) seconds"
            break
        fi
        sleep 1
    done
    return $result
}

wait_for_wrapper()
{
    if [[ "${QUIET}" -eq 1 ]]; then
        wait_for "$@" > /dev/null 2>&1
    else
        wait_for "$@"
    fi
}

while [[ $# -gt 0 ]]
do
    case "$1" in
        *:* )
        hostport=(${1//:/ })
        HOST=${hostport[0]}
        PORT=${hostport[1]}
        shift 1
        ;;
        -h)
        HOST="$2"
        if [[ ${HOST} == "" ]]; then break; fi
        shift 2
        ;;
        --host=*)
        HOST="${1#*=}"
        shift 1
        ;;
        -p)
        PORT="$2"
        if [[ ${PORT} == "" ]]; then break; fi
        shift 2
        ;;
        --port=*)
        PORT="${1#*=}"
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [[ ${TIMEOUT} == "" ]]; then break; fi
        shift 2
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        -s | --strict)
        STRICT=1
        shift 1
        ;;
        --)
        shift
        break
        ;;
        -*)
        usage
        ;;
        *)
        break
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echo "Error: you need to provide a host and port to test."
    usage
fi

wait_for_wrapper "$@"

if [[ "$?" -ne 0 && "$STRICT" == "1" ]]; then
    echo "Strict mode, failing"
    EXIT_CODE=1
fi

if [[ "$#" -gt 0 ]]; then
    exec "$@"
else
    exit $EXIT_CODE
fi