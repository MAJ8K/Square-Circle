import pygame
from network import Network

#server = input("enter the server ID:\n")

#if server == "q" or server == "Q":
server = "192.168.1.253"

N = Network(server)
N.send("sp")
print("%d\n",clientNumber = N.id)

#########################       Game Stuff       ############################

wwidth = 800
wheight = 600
window = pygame.display.set_mode((wwidth,wheight))
pygame.display.set_caption("SpecPlay")
run = True

def redraw():
    window.fill((0,0,0))
    pygame.display.update()

def main():
    while run:
        redraw()
