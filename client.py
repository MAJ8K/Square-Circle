from network import Network
import pygame

N = Network()
client = N.id
#N.send("play")

################################    Game Stuff

width = 800
height = 600
window = pygame.display.set_mode((width,height))
pygame.display.set_caption("Client")
WHITE = (255,255,255)

pSize = 10
Wrect = (400 - pSize/2, 300 - pSize/2, pSize, pSize)

def redrawWin(Data):
    window.fill((0,0,0))
    for X in Data[0]:
        if X:
            rect = (X[0],X[1],pSize,pSize)
            pygame.draw.rect(window, X[2], rect)
    for Y in Data[1]:
        pass
    pygame.draw.rect(window, WHITE, Wrect)
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