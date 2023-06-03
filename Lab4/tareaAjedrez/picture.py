from colors import *
class Picture:
  def __init__(self, img):
    self.img = img

  def __eq__(self, other):
    return self.img == other.img

  def _invColor(self, color):
    if color not in inverter:
      return color
    return inverter[color]

  def verticalMirror(self):
    """ Devuelve el espejo vertical de la imagen """
    vertical = []
    cadAux = ""
    for i in range(0, len(self.img)):
        for j in range(0, len(self.img[i])):
            cadAux = self.img[i][j] + cadAux; 
        vertical.append(cadAux)
        cadAux = ""
    
    return Picture(vertical)

  def horizontalMirror(self):
    """ Devuelve el espejo horizontal de la imagen """
    horizontal = []

    for i in range(len(self.img)-1,-1,-1):
        horizontal.append(self.img[i])

    return Picture(horizontal)

  def negative(self):
    """ Devuelve un negativo de la imagen """
    negative = []
    aux = ""
    for i in range(0,len(self.img)):
        for j in range(0, len(self.img[i])):
            aux += self._invColor(self.img[i][j])
        negative.append(aux)
        aux = ""
    return Picture(negative)

  def join(self, p):
    """ Devuelve una nueva figura poniendo la figura del argumento 
        al lado derecho de la figura actual """
    img =[]
    aux = ""
    for i in range(0,len(self.img)):
        aux += self.img[i] + p.img[i]
        img.append(aux)
        aux = ""
    return Picture(img)

  def up(self, p):
    """Devuelve una nueva figura poniendo la figura actual sofre otra figura p"""
    return Picture(None)

  def under(self, p):
    """ Devuelve una nueva figura poniendo la figura p sobre la
        figura actual """
    return Picture(None)
  
  def horizontalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura actual al costado
        la cantidad de veces que indique el valor de n """
    return Picture(None)

  def verticalRepeat(self, n):
    return Picture(None)

  #Extra: Sólo para realmente viciosos 
  def rotate(self):
    """Devuelve una figura rotada en 90 grados, puede ser en sentido horario
    o antihorario"""
    return Picture(None)
