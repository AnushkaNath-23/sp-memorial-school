@echo off
echo Starting server at http://localhost:8000
echo Press Ctrl+C to stop the server
cd /d "%~dp0"
python -m http.server 8000
pause
