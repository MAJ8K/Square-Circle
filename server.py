####
####    Must make a player class tuples cant be changed
####
####
####
from random import randint
from splayer import Entity
import socket
import pickle
from _thread import *
import sys

server = "192.168.1.253"
port = 5555

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    s.bind((server,port))
except socket.error as e:
    str(e)

s.listen()
print("Server started")
serverup = True
    

def server_control():   # control C to stop the server
    pass

players = []
bullets = []
Mid = -1
edges = (-5,-5,805,605)

def controlP(Controls, id):
    p = players[id]
    up = Controls[0]
    down = Controls[2]
    left = Controls[1]
    right = Controls[3]
    shoot = Controls[4]

    ymov,xmov = 0,0
    if up:
        ymov += 1
    if down:
        ymov += -1
    if right:
        xmov += 1
    if left:
        xmov += -1

    p.x += xmov
    p.y -= ymov

    if p.x > edges[2]:
        p.x = edges[0]
    if p.x < edges[0]:
        p.x = edges[2]
    if p.y > edges[3]:
        p.y = edges[1]
    if p.y < edges[1]:
        p.y = edges[3]

    

def client_thread(conn,id):
    reply = ""
    #data = pickle.loads(conn.recv(2048))
    ptype = "play"
    #if data == "spec":
    #    ptype = "spec"
    while True:
        try:
            data = pickle.loads(conn.recv(2048))
            reply = data
            if not data:
                break
            if ptype == "play":
                controlP(data,id)
                reply = (players,bullets)
            conn.send(pickle.dumps(reply))
        except:
            break
    print("Player ", id, "Disconnected")
    players[id] = None
    conn.close()
            
def assignId():
    x = randint(0,800)
    y = randint(0,600)
    color = (randint(0,255),randint(0,255),randint(0,255))
    d = Entity(x,y,color,10)

    assigned = False
    i = 0

    for i,X in enumerate(players):
        if not X:
            assigned = True
            break
        
    if assigned:
        players[i] = d
    else:
        i = len(players)
        players.append(d)
    return i

while serverup:
    conn, addy = s.accept()
    pid = assignId()
    print(addy, " has connected as player ", pid)
    conn.send(pickle.dumps(pid))
    start_new_thread(client_thread, (conn,pid))