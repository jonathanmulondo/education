import type { Project, Step, Track } from '@/types';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Build a Simple Arduino Temperature Monitor',
    description:
      'Learn how to build a temperature monitoring system using Arduino, a DHT22 sensor, and an LCD display. Perfect for beginners to understand sensor integration and basic embedded programming.',
    category: 'Mechatronics',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    components_list: [
      'Arduino Uno',
      'DHT22 Temperature & Humidity Sensor',
      '16x2 LCD Display',
      'Breadboard',
      'Jumper Wires',
      '10kΩ Resistor',
    ],
    learning_objectives: [
      'Understand how temperature sensors work',
      'Learn Arduino programming basics',
      'Interface sensors with microcontrollers',
      'Display data on an LCD screen',
      'Read and interpret sensor datasheets',
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Design a Basic PCB for an LED Controller',
    description:
      'Design your first printed circuit board (PCB) for a simple LED controller with PWM dimming. Learn PCB design fundamentals, component placement, and routing.',
    category: 'Electrical',
    difficulty: 'Intermediate',
    duration: '4-6 hours',
    components_list: [
      '555 Timer IC',
      'LEDs (various colors)',
      'Resistors (220Ω, 10kΩ)',
      'Capacitors (10µF, 100nF)',
      'Potentiometer (10kΩ)',
      'PCB substrate',
    ],
    learning_objectives: [
      'Understand PCB design workflow',
      'Learn schematic capture',
      'Master component footprints',
      'Understand design rule checks (DRC)',
      'Learn about PWM signal generation',
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Create a DC Motor Speed Controller (PWM-based)',
    description:
      'Build a PWM-based DC motor speed controller using an H-bridge driver. Understand motor control principles, power electronics, and feedback systems.',
    category: 'Mechatronics',
    difficulty: 'Intermediate',
    duration: '3-4 hours',
    components_list: [
      'Arduino Nano',
      'L298N H-Bridge Motor Driver',
      'DC Motor (6-12V)',
      'Potentiometer',
      'Power Supply (12V)',
      'Diodes (1N4007)',
      'Capacitors for noise filtering',
    ],
    learning_objectives: [
      'Understand PWM motor control',
      'Learn H-bridge operation',
      'Implement speed control algorithms',
      'Understand back-EMF and protection',
      'Debug motor control circuits',
    ],
    created_at: new Date().toISOString(),
  },
];

export const sampleSteps: Record<string, Step[]> = {
  '1': [
    {
      id: 'step-1-1',
      project_id: '1',
      step_number: 1,
      title: 'Gather Components and Understand the DHT22 Sensor',
      content:
        'First, gather all required components. The DHT22 is a digital temperature and humidity sensor that communicates using a single-wire protocol. It has a range of -40 to 80°C with ±0.5°C accuracy.',
      video_url: 'https://www.youtube.com/watch?v=example1',
      theory_links: [
        {
          concept: 'Temperature Sensing',
          description:
            'Temperature sensors convert thermal energy into electrical signals. The DHT22 uses a capacitive humidity sensor and thermistor.',
          formula: 'Resistance varies with temperature: R(T) = R₀ × e^(β(1/T - 1/T₀))',
        },
        {
          concept: 'Digital Communication Protocols',
          description:
            'The DHT22 uses a proprietary single-wire digital protocol with specific timing requirements for data transmission.',
        },
      ],
      checkpoint_quiz: {
        question: 'What type of sensor does the DHT22 use to measure temperature?',
        options: ['Thermistor', 'Thermocouple', 'RTD', 'Infrared'],
        correct_answer: 0,
        explanation:
          'The DHT22 uses a thermistor, which is a resistor whose resistance changes with temperature.',
      },
    },
    {
      id: 'step-1-2',
      project_id: '1',
      step_number: 2,
      title: 'Wire the Circuit on Breadboard',
      content:
        'Connect the DHT22 sensor to the Arduino: VCC to 5V, GND to GND, and DATA pin to digital pin 2. Add a 10kΩ pull-up resistor between VCC and DATA. Connect the LCD using I2C or parallel mode.',
      video_url: 'https://www.youtube.com/watch?v=example2',
      theory_links: [
        {
          concept: 'Pull-up Resistors',
          description:
            'Pull-up resistors ensure a known state (HIGH) when the sensor is not actively pulling the line LOW. Critical for reliable digital communication.',
          formula: 'Typical values: 4.7kΩ - 10kΩ for 5V systems',
        },
        {
          concept: 'I2C Communication',
          description:
            'Inter-Integrated Circuit (I2C) is a two-wire serial protocol (SDA and SCL) that allows multiple devices to communicate on the same bus.',
        },
      ],
    },
    {
      id: 'step-1-3',
      project_id: '1',
      step_number: 3,
      title: 'Write the Arduino Code',
      content:
        'Install the DHT sensor library and LiquidCrystal library via Arduino IDE. Write code to read sensor data every 2 seconds and display temperature and humidity on the LCD.',
      video_url: 'https://www.youtube.com/watch?v=example3',
      theory_links: [
        {
          concept: 'Arduino Libraries',
          description:
            'Libraries provide pre-written code for common tasks. The DHT library handles the timing-critical communication with the sensor.',
        },
        {
          concept: 'Sampling Rate',
          description:
            'The DHT22 has a 2-second sampling period. Reading faster than this will return cached values.',
        },
      ],
    },
    {
      id: 'step-1-4',
      project_id: '1',
      step_number: 4,
      title: 'Test and Calibrate',
      content:
        'Upload your code and monitor the serial output. Compare readings with a known thermometer. Test the system by breathing on the sensor or using ice to verify temperature changes are detected.',
      theory_links: [
        {
          concept: 'Sensor Calibration',
          description:
            'Calibration ensures accuracy by comparing sensor readings to known standards and applying correction factors if needed.',
        },
      ],
    },
    {
      id: 'step-1-5',
      project_id: '1',
      step_number: 5,
      title: 'Add Features and Improvements',
      content:
        'Enhance your project: add temperature threshold alerts using LEDs or buzzer, log data to SD card, or create a graph of temperature over time.',
      theory_links: [
        {
          concept: 'Data Logging',
          description:
            'Storing sensor data allows for trend analysis and long-term monitoring. Common storage methods include SD cards, EEPROM, or cloud services.',
        },
      ],
    },
  ],
  '2': [
    {
      id: 'step-2-1',
      project_id: '2',
      step_number: 1,
      title: 'Learn PCB Design Software Basics',
      content:
        'Download and install KiCad (free and open-source). Familiarize yourself with the schematic editor and PCB layout tools. Understand the design workflow: schematic → netlist → PCB layout → manufacturing files.',
      video_url: 'https://www.youtube.com/watch?v=example4',
      theory_links: [
        {
          concept: 'Schematic Capture',
          description:
            'Schematics represent electrical connections logically, showing how components connect without regard to physical placement.',
        },
        {
          concept: 'Netlist',
          description:
            'A netlist is a list of all connections (nets) between component pins, used to transfer design from schematic to layout.',
        },
      ],
    },
    {
      id: 'step-2-2',
      project_id: '2',
      step_number: 2,
      title: 'Create the Schematic for 555 Timer LED Controller',
      content:
        'Design the circuit: 555 timer in astable mode to generate PWM signal, power LED through current-limiting resistor. Add potentiometer to control frequency/duty cycle.',
      video_url: 'https://www.youtube.com/watch?v=example5',
      theory_links: [
        {
          concept: '555 Timer Astable Mode',
          description:
            'In astable mode, the 555 timer continuously oscillates between HIGH and LOW, creating a square wave.',
          formula: 'Frequency: f = 1.44 / ((R1 + 2×R2) × C)',
        },
        {
          concept: 'PWM (Pulse Width Modulation)',
          description:
            'PWM controls power delivery by varying the duty cycle (percentage of time the signal is HIGH) of a square wave.',
          formula: 'Duty Cycle = (R1 + R2) / (R1 + 2×R2)',
        },
      ],
    },
    {
      id: 'step-2-3',
      project_id: '2',
      step_number: 3,
      title: 'Design the PCB Layout',
      content:
        'Import netlist to PCB editor. Place components logically (power input, IC, output). Route traces following best practices: keep power traces wider, minimize trace length, avoid sharp angles.',
      video_url: 'https://www.youtube.com/watch?v=example6',
      theory_links: [
        {
          concept: 'Trace Width and Current Capacity',
          description:
            'Wider traces can handle more current. Calculate required width based on expected current and acceptable temperature rise.',
          formula: 'Rule of thumb: 10 mils (0.25mm) per amp for external layers',
        },
        {
          concept: 'Ground Planes',
          description:
            'A ground plane provides low-impedance return path, reduces EMI, and improves thermal performance.',
        },
      ],
    },
    {
      id: 'step-2-4',
      project_id: '2',
      step_number: 4,
      title: 'Run Design Rule Check and Generate Gerber Files',
      content:
        'Run DRC to catch errors (shorts, clearance violations). Generate Gerber files and drill files for manufacturing. Review files in a Gerber viewer before ordering.',
      theory_links: [
        {
          concept: 'Design Rule Check (DRC)',
          description:
            'DRC verifies the design meets manufacturing constraints: minimum trace width, spacing, hole sizes, etc.',
        },
        {
          concept: 'Gerber Files',
          description:
            'Industry-standard format describing copper layers, solder mask, silkscreen, and drill locations for PCB manufacturing.',
        },
      ],
    },
  ],
  '3': [
    {
      id: 'step-3-1',
      project_id: '3',
      step_number: 1,
      title: 'Understand H-Bridge Motor Control',
      content:
        'Learn how an H-bridge allows bidirectional motor control by switching current direction. Study the L298N module schematic and pin functions.',
      video_url: 'https://www.youtube.com/watch?v=example7',
      theory_links: [
        {
          concept: 'H-Bridge Operation',
          description:
            'An H-bridge uses four switches arranged in an "H" configuration to control motor direction and speed by switching current paths.',
        },
        {
          concept: 'Shoot-Through Protection',
          description:
            'Never turn on both switches in the same leg simultaneously, as this creates a short circuit. Use dead-time between switching.',
        },
      ],
    },
    {
      id: 'step-3-2',
      project_id: '3',
      step_number: 2,
      title: 'Wire the L298N to Arduino and Motor',
      content:
        'Connect L298N IN1 and IN2 to Arduino digital pins, ENA to PWM pin. Connect motor to OUT1 and OUT2. Wire 12V power supply to L298N, ensuring common ground with Arduino.',
      video_url: 'https://www.youtube.com/watch?v=example8',
      theory_links: [
        {
          concept: 'Common Ground',
          description:
            'All components must share a common ground reference for reliable signal communication between devices.',
        },
        {
          concept: 'Flyback Diodes',
          description:
            'Motors generate voltage spikes when switched off due to inductance. Flyback diodes protect circuits by providing a path for this energy.',
          formula: 'Back-EMF voltage can reach: V_spike ≈ L × (dI/dt)',
        },
      ],
    },
    {
      id: 'step-3-3',
      project_id: '3',
      step_number: 3,
      title: 'Program Speed and Direction Control',
      content:
        'Write Arduino code to read potentiometer position and map it to PWM duty cycle (0-255). Implement forward, reverse, and stop functions using H-bridge control signals.',
      theory_links: [
        {
          concept: 'Analog-to-Digital Conversion',
          description:
            'Arduino reads analog voltage (0-5V) from potentiometer and converts it to a digital value (0-1023) using its 10-bit ADC.',
          formula: 'Digital Value = (Analog Voltage / V_ref) × 1023',
        },
        {
          concept: 'PWM Frequency',
          description:
            'Arduino PWM frequency is ~490Hz on most pins. For motors, this is usually sufficient, but higher frequencies reduce audible noise.',
        },
      ],
    },
  ],
};

export const sampleTracks: Track[] = [
  {
    id: 'track-1',
    name: 'Introduction to Embedded Systems',
    description:
      'Start your journey into embedded systems with Arduino. Learn sensors, actuators, and basic programming.',
    project_ids: ['1', '3'],
    category: 'Mechatronics',
  },
  {
    id: 'track-2',
    name: 'PCB Design Fundamentals',
    description:
      'Master the art of designing printed circuit boards from schematic to manufacturing.',
    project_ids: ['2'],
    category: 'Electrical',
  },
];
