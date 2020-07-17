from network import Network
from splayer import Entity
import pygame

server = ""
server = input("enter the server id: ")

N = Network(server)
client = N.id
#N.send("play")

################################    Game Stuff

width = 800
height = 600
window = pygame.display.set_mode((width,height))
pygame.display.set_caption("Client")
WHITE = (255,255,255)

Brect = [
    (325,225,150,150),
    (-100,575,450,300),
    (450,575,450,300),
    (-100,0,450,25),
    (450,0,450,25),
    (-10,400,310,50),
    (750,400,60,50),
    (575,100,75,400),
    (100,100,75,75),
    (300,100,75,75)
] 

def redrawWin(Data):
    window.fill((0,0,0))
    for X in Data[0]:
        if X:
            rect = (int(X.x),int(X.y),X.size,X.size)
            pygame.draw.rect(window, X.color, rect)
    for Y in Brect:
        pygame.draw.rect(window, WHITE, Y)
    for Z in Data[1].values():
        if Z:
            pygame.draw.circle(window,Z.color,(int(Z.x),int(Z.y)),int(Z.size))
    pygame.display.update()

def main():
    run = True

    while run:
        W = pygame.key.get_pressed()[pygame.K_w]
        A = pygame.key.get_pressed()[pygame.K_a]
        S = pygame.key.get_pressed()[pygame.K_s]
        D = pygame.key.get_pressed()[pygame.K_d]
        SP = pygame.key.get_pressed()[pygame.K_SPACE]
        Control = (W,A,S,D,SP)
        
        redrawWin(N.send(Control))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()

main()