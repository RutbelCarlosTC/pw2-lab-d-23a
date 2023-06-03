import esUnitaria as fu
def prueba(M):
    if (fu.esUnitaria(M)):
        print("Si es unitaria")
    else:
        print("No es unitaria")
#Z = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
#Z = [[1, 2, 3], [4, 1, 6], [7, 8, 1]]
Z = [[2, 0, 0], [0, 2, 0], [0, 0, 2]]
#Z = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

prueba(Z)