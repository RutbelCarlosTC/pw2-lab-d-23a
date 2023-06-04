from interpreter import draw
from chessPictures import *

filaCuadrosA = (square.join(square.negative())).horizontalRepeat(4)
draw(filaCuadrosA)