from interpreter import draw
from chessPictures import *
#Par de caballos blanco y negro 
CaballosA = knight.join(knight.negative())
#Par de caballos negro y blanco
CaballosB = CaballosA.negative() 
#dibujando grupo de caballos
grupoCaballos = Picture(CaballosA.img + CaballosB.img)
draw(grupoCaballos)
