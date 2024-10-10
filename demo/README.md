# Week 7.3: LangServe

## Introduction
Seamlessly deploy and manage LangChain-based agents using LangServe, Docker, LangChain CLI, and Render for efficient cloud operations. [Access a LangServe scaffold made using Docker and ready to deploy on Render here.](https://github.com/bloominstituteoftechnology/ai-deployment-example)

## Slides

[Slides](https://docs.google.com/presentation/d/1hpNemKpwgmZRQubRjZC3i1JKRXjXmLa9QbUWqNHkQug/edit#slide=id.g2e4f8db8c66_0_0)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Docker Desktop (recommended for local setup)
- Python 3.11.0 or greater (local setup with virtual environment)

### Set up environment variables:
- Copy the sample environment file:
  ```bash
  cp .env.sample .env
  ```
- Edit the `.env` file:
  ```
  OPENAI_API_KEY=your-openai-key
  LANGCHAIN_API_KEY=your-langchain-key
  LANGCHAIN_TRACING_V2=true
  LANGCHAIN_PROJECT=24a5_7_3
  ```
## Docker (recommended)
1. Start Jupyter to run the `.ipynb` files with a local notebook:
   ```
   docker compose up jupyter
   ```
3. Run any `.py` file in the root directory in this manner (ones you may create):
   ```
   docker compose run --rm main python <the_py_files>
   ```

## Running Different Scripts
You can use the provided `run.sh` script for easier execution.
Make sure to make the script executable with `chmod +x run.sh` in the CLI before using:
```bash
./run.sh jupyter #(starts the jupyter notebook server)
./run.sh <your_new_py_file> #(runs other .py file)
```
## Local Setup (Alternative to Docker)
If you prefer to run the examples locally:

1. Ensure you have Python 3.11.0 or higher installed.
2. Clone the repository:
    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```
3. Set up the virtual environment:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    pip install -r requirements.txt
    ```
4. Configure environment variables as described in the Setup section.
5. Export your `.env` variables to the system (python-dotenv should handle this for you in the main `simple_message_graph.py` and `multi-agent-collaboration.ipynb` files, but this is included for reference):
   **Linux / Mac / Bash**
      ```bash
      export $(grep -v '^#' .env | xargs)
      ```
5. Run the notebooks:
    ```
    run the `.ipynb` files in VSCode (it will prompt you to allow the installation of ipykernel: do so) or another IDE that supports notebooks.
    ```
## Need Help?
Reach out to the course instructor or learning assistant
