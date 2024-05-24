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
ATTENUATION_COEFFICIENTS = {
    'Water': 0.02,
    'Polyethylene': 0.015,
    'Aluminum': 0.05,
    'Lead': 0.1,
}
RISK_PER_SIEVERT = 0.05  # Assumed 5% increased cancer risk per sievert of radiation
EARTH_BACKGROUND_RADIATION = 0.003  # Approximate annual radiation dose in sieverts

def simulate_radiation(material, num_particles, energy, attenuation_coefficient):
    transmitted_particles = 0
    for _ in range(num_particles):
        # Simple exponential attenuation model
        if np.random.rand() < np.exp(-attenuation_coefficient * MATERIALS[material]['thickness']):
            transmitted_particles += 1
    return transmitted_particles / num_particles

def calculate_dose(transmission_fraction, energy):
    # Assume energy in arbitrary units can be converted directly to dose in sieverts
    # This is a simplification. In reality, the conversion depends on particle type and energy.
    return energy * (1 - transmission_fraction)

def calculate_cancer_risk(dose):
    # Linear No-Threshold model: Risk increases linearly with dose
    return dose * RISK_PER_SIEVERT

# Run simulation
results = {}
for material, properties in MATERIALS.items():
    attenuation_coefficient = ATTENUATION_COEFFICIENTS[material]
    transmission_fraction = simulate_radiation(material, NUM_PARTICLES, RADIATION_ENERGY, attenuation_coefficient)
    dose = calculate_dose(transmission_fraction, RADIATION_ENERGY)
    cancer_risk = calculate_cancer_risk(dose)
    results[material] = {
        'transmission_fraction': transmission_fraction,
        'dose': dose,
        'cancer_risk': cancer_risk
    }

# Compare to Earth background radiation
earth_dose = EARTH_BACKGROUND_RADIATION
earth_cancer_risk = calculate_cancer_risk(earth_dose)

# Plot results
materials = list(results.keys())
doses = [results[material]['dose'] for material in materials]
cancer_risks = [results[material]['cancer_risk'] for material in materials]

plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.bar(materials, doses, color=['blue', 'green', 'orange', 'red'])
plt.axhline(y=earth_dose, color='black', linestyle='--', label='Earth Background Radiation')
plt.xlabel('Material')
plt.ylabel('Dose (Sieverts)')
plt.title('Radiation Dose Simulation')
plt.legend()

plt.subplot(1, 2, 2)
plt.bar(materials, cancer_risks, color=['blue', 'green', 'orange', 'red'])
plt.axhline(y=earth_cancer_risk, color='black', linestyle='--', label='Earth Background Cancer Risk')
plt.xlabel('Material')
plt.ylabel('Increased Cancer Risk')
plt.title('Cancer Risk Simulation')
plt.legend()

plt.tight_layout()
plt.show()
