const readlineSync = require('readline-sync')
const {exec} = require('child_process')

class Create {

    presets() {
        const presets = []

        const ts = readlineSync.question('[!] Utilizar typescript? (S/n) ')

        ts.toLocaleLowerCase()

        if(!ts || ts === 's'){
            presets.push('ts')
        }

        const tw = readlineSync.question('[!] Utilizar Tailwind? (S/n) ')

        tw.toLocaleLowerCase()

        if(!tw || tw === 's'){
            presets.push('tw')
        }

        return presets
    }

    generate () {
        const presets = this.presets()

        const name = readlineSync.question('[!] Nome do projeto: (meu-projeto-react) ')

        var template = 'react'

        if(presets.includes('ts')){
            template = 'react-ts'
        }

        exec(`npm create vite@latest ${name || 'meu-projeto-react'} -- --template ${template}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            }
            if(!presets.includes('tw')){
                console.log(stdout)
            }
            exec(`cd ${name || 'meu-projeto-react'} && npm install -D tailwindcss && npx tailwindcss init`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`)
                }
                console.log('TailwindCSS instalado com sucesso...')
                console.log('Arquivo de configuração padrão criado com sucesso...')
            })
        })
    }
}


module.exports = new Create()