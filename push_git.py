import os
import shutil
import subprocess

REPO = r"D:\PROJET_ligne_mire\app_reservation"
REMOTE = "https://github.com/raharimanantenadiary/app_reservation.git"

commits = [
("2025-02-12T17:00:00","modif"),
]

os.chdir(REPO)

if os.path.exists(".git"):
    shutil.rmtree(".git", ignore_errors=True)

def run(cmd, env=None):
    print(">", cmd)
    subprocess.run(cmd, shell=True, check=True, env=env)

run("git init")
run("git branch -M main")
run(f"git remote add origin {REMOTE}")

with open(".gitignore","w",encoding="utf8") as f:
    f.write("""
node_modules/
backend/node_modules/
frontend/node_modules/
.env
""")

run("git add .")

env = os.environ.copy()
env["GIT_AUTHOR_DATE"] = commits[0][0]
env["GIT_COMMITTER_DATE"] = commits[0][0]

run(f'git commit -m "{commits[0][1]}"', env)

for i,(date,msg) in enumerate(commits[1:],1):

    fname = f".commit_{i}.txt"

    with open(fname,"w",encoding="utf8") as f:
        f.write(msg)

    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date
    env["GIT_COMMITTER_DATE"] = date

    run(f"git add {fname}", env)
    run(f'git commit -m "{msg}"', env)

run("git push -u origin main --force")

print("OK")