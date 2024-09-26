// create-my-template.js
// const { execSync } = require('child_process');
// const path = require('path');

// const templateName = process.argv[2] || 'my-next-app'; // Default name if none provided
// const templatePath = path.join(__dirname); // Path to the current template directory

// console.log(`Creating a new Next.js app in ${templateName}...`);

// execSync(`npx create-next-app@latest ${templateName} --use-npm --example ${templatePath}`, {
//     stdio: 'inherit',
// });

// console.log(`Successfully created ${templateName}!`);


// create-next-app-from-template.js
const { execSync } = require('child_process');
const path = require('path');

const templatePath = path.resolve(__dirname,); // Path to your original app

const newAppName = process.argv[2] || 'my-new-next-app'; // Default name if none provided

console.log(`Creating a new Next.js app from template "${newAppName}"...`, templatePath);

// try {
//     // Create a new app directory and copy files from the template
//     execSync(`cp -r ${templatePath} ${newAppName}`, {
//         stdio: 'inherit',
//     });

//     console.log(`Successfully created "${newAppName}"!`);
// } catch (error) {
//     console.error(`Failed to create a new Next.js app: ${error.message}`);
// }
try {
    // Use 'file:' prefix to specify that the example is a local directory
    execSync(`npx create-next-app@latest ${newAppName} --use-npm --example file:${templatePath}`, {
        stdio: 'inherit',
    });

    console.log(`Successfully created "${newAppName}"!`);
} catch (error) {
    console.error(`Failed to create a new Next.js app: ${error.message}`);
}