import matplotlib.pyplot as plt
from astroquery.jplhorizons import Horizons
import numpy as np

def plot_orbits():
    # Define the time range
    start_date = '2023-05-20'
    end_date = '2024-05-20'
    step = '1d'

    # Define the planets to plot
    planets = {
        'Mercury': 199,
        'Venus': 299,
        'Earth': 399,
        'Mars': 499,
        'Jupiter': 599,
        'Saturn': 699,
        'Uranus': 799,
        'Neptune': 899
    }

    fig, ax = plt.subplots(subplot_kw={'projection': 'polar'})

    for planet, id in planets.items():
        print('disjda')
        obj = Horizons(id=id, location='@sun', epochs={'start': start_date, 'stop': end_date, 'step': step})
        eph = obj.ephemerides()
        r = eph['r']  # Distance from the sun
        theta = np.radians(eph['RA'])  # Right ascension to radians
        ax.plot(theta, r, label=planet)

    ax.set_title('Orbits of the Planets')
    ax.set_xlabel('RA (radians)')
    ax.set_ylabel('Distance (AU)')
    ax.legend()

    print('disjda')

    plt.show()

plot_orbits()