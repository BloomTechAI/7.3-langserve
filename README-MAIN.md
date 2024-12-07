# Week 7.3: LangServe Demos

## NOTE
The folowing instructions are extras for the `demo` directory. For the main deployment example, see the [DEPLOYMENT README](./README-DEPLOYMENT.md).

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
  LANGCHAIN_PROJECT=week_7_3
  ```
## Docker (recommended)

1. In the CLI, `cd` into the `demo` directory. You MUST follow this step before proceeding to access the correct `Dockerfile`/`docker-compose.yml`.
2. Look at the `docker-compose.yml` and `Dockerfile` file to understand the different services they are managing/running.
3. Start the Python servers in `in_class_examples` in their respective directories (each command runs its separate server container, and is run from the `demo` directory):
   ```
   docker compose up agent
   docker compose up chat
   ```
4. Start Jupyter to run the corresponding `.ipynb` files with a local notebook:
   ```
   docker compose up jupyter
   ```
5. Run any `.py` file in the root directory in this manner (`.py` files you may create):
   ```
   docker compose run --rm main python <the_py_file>
   ```

## Running Different Scripts
You can use the provided `run.sh` script for easier execution.
Make sure to make the script executable with `chmod +x run.sh` in the CLI before using:
```bash
./run.sh agent #(starts the agent server)
./run.sh chat #(starts the chat server)
./run.sh jupyter #(starts the jupyter notebook server)
./run.sh <your_new_py_file> #(runs other .py files)
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
5. Export your `.env` variables to the system (LangChain will handle this for you "under the hood" in the `.ipynb` files, but this is included for reference):
   **Linux / Mac / Bash**
      ```bash
      export $(grep -v '^#' .env | xargs)
      ```
6. Run the notebooks:
    ```
    run the `.ipynb` files in VSCode (it will prompt you to allow the installation of ipykernel: do so) or another IDE that supports notebooks.
    ```
## Need Help?
Reach out to the course instructor or learning assistant
