from interpreter import draw
from chessPictures import *
#estructura de piezas grandes
izq = (rock.join(knight)).join(bishop)
centro = queen.join(king)
der = (bishop.join(knight)).join(rock)

#estructura de filas de cuadros
filaCuadrosA = (square.join(square.negative())).horizontalRepeat(4)
filaCuadrosB = filaCuadrosA.negative()

peones = pawn.horizontalRepeat(8)
piezas = (izq.join(centro)).join(der)

blancas  = Picture(peones.img + piezas.img)
negras = Picture(piezas.img + peones.img).negative()

filaCuadrosAB = Picture(filaCuadrosA.img + filaCuadrosB.img)
#grupos de piezas
grupoBlancas = blancas.up(filaCuadrosAB)
grupoNegras = (negras.up(filaCuadrosAB))
grupoCuadros = filaCuadrosAB.verticalRepeat(2)
#dibujando tablero
tablero = Picture(grupoNegras.img + grupoCuadros.img + grupoBlancas.img)
draw(tablero)





