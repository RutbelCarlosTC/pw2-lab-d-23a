from interpreter import draw
from chessPictures import *

filaCuadrosA = (square.join(square.negative())).horizontalRepeat(4)
filaCuadrosB = filaCuadrosA.negative()
filaCuadrosAB = Picture(filaCuadrosA.img + filaCuadrosB.img)
grupoCuadros = filaCuadrosAB.verticalRepeat(2)
draw(grupoCuadros)