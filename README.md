# TaskMaster

TaskMaster is a simple and intuitive task management application that allows users to create, prioritize, and randomly select tasks. It is designed to help users stay organized and productive by providing a clean and interactive interface for managing tasks.

---

## Features

- **Task Creation**: Add tasks with ease by typing and pressing Enter.
- **Task Prioritization**: Assign importance levels (1 to 3 stars) to tasks.
- **Random Task Selection**: Randomly pick a task to focus on, weighted by its importance.
- **Task Completion**: Mark tasks as completed and keep track of progress.
- **Task Editing**: Edit task descriptions directly in the list.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **JavaScript**: For application logic and interactivity.

---

## Installation & Setup (Beginner-Friendly Guide)

### 1. Verify Node and npm versions

```bash
node -v
npm -v
```

- **Why:** Ensures you're using a supported environment.
- ✅ Recommended: **Node 18+** and **npm 9+**
- 🛠 If you're using [nvm-windows](https://github.com/coreybutler/nvm-windows), make sure to switch to a modern version:

```bash
nvm install 20
nvm use 20
```

### 2. Create your React app

```bash
npx create-react-app taskmaster
```

- `npx` runs the latest version without installing it globally.
- ⚠️ You might see a deprecation warning — it’s still usable.

### 3. Move into your project folder

```bash
cd taskmaster
```

### 4. Install Tailwind CSS and required dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

- `-D` installs as devDependencies.
- ⚠️ If you see `ECONNRESET`, run:
```bash
npm cache clean --force
```

### 5. Initialize Tailwind config files

```bash
npx tailwindcss init -p
```

- Creates `tailwind.config.js` and `postcss.config.js`

⚠️ If it fails with "not recognized":
```bash
npm install -D tailwindcss-cli
npx tailwindcss init -p
```
Or:
```bash
node ./node_modules/tailwindcss/lib/cli.js init -p
```

### 6. Configure Tailwind to scan files

Edit `tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 7. Add Tailwind to your CSS

Replace everything in `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 8. Start the development server

```bash
npm start
```

### 9. Test Tailwind is working

Replace `App.js` content with:
```jsx
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
      Tailwind CSS is working! 🚀
    </div>
  );
}
export default App;
```

---

## Troubleshooting: Where Things Might Go Wrong

| Problem | What it Means | How to Fix |
|--------|----------------|------------|
| `'tailwind' is not recognized` | Windows can't find the CLI | Install `tailwindcss-cli`, or use `node ./node_modules/tailwindcss/lib/cli.js init -p` |
| `ECONNRESET` on install | Network issue (proxy, firewall) | `npm cache clean --force`, check VPN/proxy settings |
| `npm bin` not working | Outdated npm or misconfigured | Use `Get-ChildItem node_modules/.bin` on PowerShell |
| Tailwind styles not showing | Wrong config or missing `@tailwind` directives | Ensure Tailwind setup in `index.css` and config is correct |

### Final Tip:
In `package.json`, add:
```json
"scripts": {
  "tailwind:init": "tailwindcss init -p"
}
```
Then run:
```bash
npm run tailwind:init
```

---

## Git & GitHub Workflow Guide (with Explanations & Debugging Tips)

### 1. Create Your Project Folder
```bash
cd path/to/your/project
code .
```

### 2. Initialize Git
```bash
git init
```

### 3. Check Your Current Branch
```bash
git branch
git branch -m main
```

### 4. Connect to GitHub Remote Repo
```bash
git remote add origin https://github.com/your-username/repo-name.git
git remote -v
```

### 5. Add Your Files
```bash
git add .
```

### 6. Commit Your Files
```bash
git commit -m "Initial commit"
```

### 7. Push to GitHub
```bash
git push -u origin main
```

### Common Errors & Fixes
- **`src refspec main does not match any`** → commit first before pushing.
- **`remote contains work...`** → resolve with:
```bash
git pull origin main --allow-unrelated-histories
git add .
git commit -m "Resolved merge conflict"
git push -u origin main
```

### Troubleshooting Checklist

| Problem | What to Check |
|--------|----------------|
| `remote origin already exists` | Run `git remote -v`, then use `git remote set-url origin <new-url>` |
| `nothing to commit` | Run `git status` to check staged changes |
| `fatal: 'origin' does not appear to be a git repository` | Check if you're in the right folder with `git remote -v` |
| `merge conflict` | Edit files with `<<<<<<< HEAD` markers, resolve and commit |

---

## Usage

- **Add Tasks**: Type a task in the input field and press Enter.
- **Prioritize Tasks**: Assign importance levels to tasks by clicking on the stars.
- **Pick a Task**: Click the "Pick a Task" button to randomly select a task based on its importance.
- **Complete Tasks**: Mark tasks as done by checking the checkbox.
- **Edit Tasks**: Click on a task to edit its description.

---

## Folder Structure
```
taskmaster/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.css
│   └── index.js
```

---

## Scripts

```bash
npm start         # Runs the app in development mode.
npm run build     # Builds the app for production.
npm test          # Launches the test runner.
npm run eject     # Ejects the app configuration.
```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Built with Create React App.
- Styled using Tailwind CSS.
