
import subprocess
import sys
import os
import signal

processes = []

def run_command(command, cwd=None):
    process = subprocess.Popen(
        command,
        shell=True,
        cwd=cwd
    )
    processes.append(process)
    return process

def shutdown(signum, frame):
    print("\nShutting down all services...")
    for process in processes:
        process.terminate()
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, shutdown)

    print("Starting Django backend...")
    run_command("python manage.py runserver")

    print("Starting Celery worker...")
    run_command("python -m celery -A scheduled_orders worker --loglevel=info")

    print("Starting Celery beat...")
    run_command("python -m celery -A scheduled_orders beat --loglevel=info")

    print("Starting React frontend...")
    run_command("npm start", cwd="frontend")

    print("\nAll services started.")
    print("Press CTRL+C to stop everything.\n")

    # Keep script running
    signal.pause()
