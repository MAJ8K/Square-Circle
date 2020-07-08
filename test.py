import pygame

wwidth = 800
wheight = 600
window = pygame.display.set_mode((wwidth,wheight))
pygame.display.set_caption("SpecPlay")

def redraw(win):
    win.fill((0,0,0))
    pygame.display.update()

def main():
    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame.quit()
        redraw(window)
