from interpreter import draw
from chessPictures import *

CaballosA = knight.join(knight.negative())
CaballosB = CaballosA.negative()

grupoCaballos = Picture(CaballosA.img + CaballosB.img)
draw(grupoCaballos)
