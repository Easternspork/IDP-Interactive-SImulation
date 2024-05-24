import numpy as np
import matplotlib.pyplot as plt

# Constants
NUM_PARTICLES = 10000  # Number of particles to simulate
RADIATION_ENERGY = 100  # Arbitrary energy unit of the radiation
MATERIALS = {
    'Water': {'density': 1.0, 'thickness': 10},
    'Polyethylene': {'density': 0.94, 'thickness': 10},
    'Aluminum': {'density': 2.7, 'thickness': 10},
    'Lead': {'density': 11.34, 'thickness': 10},
}

# Attenuation coefficients (arbitrary units for simulation purposes)
ATTENUATION_COEFFICIENTS = {
    'Water': 0.02,
    'Polyethylene': 0.015,
    'Aluminum': 0.05,
    'Lead': 0.1,
}

def simulate_radiation(material, num_particles, energy, attenuation_coefficient):
    transmitted_particles = 0
    for _ in range(num_particles):
        # Simple exponential attenuation model
        if np.random.rand() < np.exp(-attenuation_coefficient * MATERIALS[material]['thickness']):
            transmitted_particles += 1
    return transmitted_particles / num_particles

# Run simulation
results = {}
for material, properties in MATERIALS.items():
    attenuation_coefficient = ATTENUATION_COEFFICIENTS[material]
    transmission_fraction = simulate_radiation(material, NUM_PARTICLES, RADIATION_ENERGY, attenuation_coefficient)
    results[material] = transmission_fraction

# Plot results
materials = list(results.keys())
transmissions = list(results.values())

plt.figure(figsize=(10, 6))
plt.bar(materials, transmissions, color=['blue', 'green', 'orange', 'red'])
plt.xlabel('Material')
plt.ylabel('Transmission Fraction')
plt.title('Radiation Attenuation Simulation')
plt.ylim(0, 1)
plt.show()
