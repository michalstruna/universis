// UNIX
mkdir ~/db && mongod --dbpath="$(echo $HOME)/db"
// Windows 10
mkdir c:\data\db && "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
