import pygame

pygame.init()
window = pygame.display.set_mode((800,600))

#dictionary
values = {
    "x" : 0,
    "y" : 0
}
multdict = {}
multdict[0] = values.copy()
multdict[5] = values.copy()
print(multdict)
multdict[5]["x"] = 7
print(multdict[5]["x"])

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    