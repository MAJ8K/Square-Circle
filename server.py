import socket
from _thread import *
import pickle
from network import Network

serverup = True

#server = input("enter the server ID:\n")

#if server == "q" or server == "Q":
server = "192.168.1.253"

N = Network(server)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    s.bind((N.server,N.port))
except socket.error as e:
    str(e)

s.listen()
print("Server started")
serverup = True
    

def server_control():
    #
    #    control C to stop the server
    #
    #
    #
    #
    pass

players = []
bullets = []

def client_control(conn,id):
    conn.send(pickle.dumps(id))
    while True:
        pass

def assignId():
    players.append((0,0))
    return len(players) - 1

while serverup:
    conn, addy = s.accept()
    print(addy, " has connected")

    start_new_thread(client_control, (conn,assignId(),))