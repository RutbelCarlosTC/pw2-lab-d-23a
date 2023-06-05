from interpreter import draw
from chessPictures import *

CaballosA = knight.join(knight.negative())
CaballosB = CaballosA.verticalMirror()

grupoCaballos = Picture(CaballosA.img + CaballosB.img)
draw(grupoCaballos)
