@ECHO OFF
SET BASEDIR=%cd%\\..
SET LOGDIR="%basedir%\logs"
SET SERVERPATH="C:\Program Files\MongoDB\Server\4.2\bin\"
SET DATAPATH="C:\Program Files\Mongodb\Server\4.2\data"

REM  Create Log directory
IF NOT EXIST %LOGDIR% mkdir %LOGDIR%

REM Stopping old database service

REM Creating mongod service
CALL %SERVERPATH%\mongod --dbpath %DATAPATH% --logpath "%LOGDIR%\mongod.log" --install

REM Starting mongod service
call net start "MongoDB"