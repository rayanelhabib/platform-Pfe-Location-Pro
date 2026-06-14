@echo off
color 0b
echo ========================================================
echo       PRESTIGE MAROC - ECOSYSTEM RUNNER
echo ========================================================
echo.
echo Starting all micro-services...
echo.

echo [1/4] Starting Landing Page (Enterprise Portal)
start "Prestige Portal" cmd /c "cd enterprise-portal && npm run dev"

echo [2/4] Starting Prestige Nexus (Service CRM - Twenty)
start "Prestige Nexus (CRM)" cmd /c "cd service-crm && npm start"

echo [3/4] Starting Prestige Core (Service ERP - Idurar)
start "Prestige Core (ERP)" cmd /c "cd service-erp && npm run dev"

echo [4/4] Starting Prestige Fleet (Service LOC - Bookcars)
start "Prestige Fleet (LOC Frontend)" cmd /c "cd service-location\frontend && npm start"
start "Prestige Fleet (LOC Backend)" cmd /c "cd service-location\backend && npm start"
start "Prestige Fleet (LOC Admin)" cmd /c "cd service-location\admin && npm start"

echo.
echo ========================================================
echo All services have been launched in separate windows!
echo ========================================================
echo Ports mappings:
echo - Portal : http://localhost:3000
echo - CRM    : http://localhost:3001
echo - ERP    : http://localhost:3002
echo - LOC    : http://localhost:3003
echo ========================================================
pause
