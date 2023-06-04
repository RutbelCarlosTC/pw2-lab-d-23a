from interpreter import draw
from chessPictures import *

izq = (rock.join(knight)).join(bishop)
centro = queen.join(king)
der = (bishop.join(knight)).join(rock)

filaCuadrosA = (square.join(square.negative())).horizontalRepeat(4)
filaCuadrosB = filaCuadrosA.negative()

peones = pawn.horizontalRepeat(8)
piezas = (izq.join(centro)).join(der)

blancas  = Picture(peones.img + piezas.img)
negras = Picture(piezas.img + peones.img).negative()

filaCuadrosAB = Picture(filaCuadrosA.img + filaCuadrosB.img)

grupoBlancas = blancas.up(filaCuadrosAB)
grupoNegras = (negras.up(filaCuadrosAB))
grupoCuadros = filaCuadrosAB.verticalRepeat(2)

tablero = Picture(grupoNegras.img + grupoCuadros.img + grupoBlancas.img)
draw(tablero)