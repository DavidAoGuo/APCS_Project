# Automated Pet Care System (APCS) - Backend

This repository contains the backend services for the Automated Pet Care System, an IoT solution for automated pet care.

## Project Structure

- \`control_system/\`: Core system for processing sensor data and controlling actuators
- \`api/\`: REST API for mobile app communication
- \`cloud_services/\`: Data storage and user management
- \`smart_home/\`: Google Home and Alexa integration
- \`utils/\`: Helper functions and utilities
- \`tests/\`: Unit and integration tests

## Setup

1. Create a virtual environment:
\`\`\`bash
conda create -n apcs_backend python=3.9
conda activate apcs_backend
\`\`\`

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Run the application:
\`\`\`bash
python main.py
\`\`\`

## Testing

Run tests using pytest:
\`\`\`bash
pytest
\`\`\`

## License
