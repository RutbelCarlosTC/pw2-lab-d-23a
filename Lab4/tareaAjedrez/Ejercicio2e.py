from interpreter import draw
from chessPictures import *

filaCuadrosB = ((square.negative()).join(square)).horizontalRepeat(4)
draw(filaCuadrosB)