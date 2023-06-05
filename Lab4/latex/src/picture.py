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