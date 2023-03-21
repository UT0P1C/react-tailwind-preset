const readlineSync = require('readline-sync')
const {exec} = require('child_process')

class Create {
    Reset = "\x1b[0m"
    FgBlue = "\x1b[34m"
    FgGreen = "\x1b[32m"
    FgMagenta = "\x1b[35m"

    presets() {

        console.log(`${this.FgMagenta} Feito por: Vinicius Gomes`)
        console.log(this.Reset)

        const presets = []

        const ts = readlineSync.question(`${this.FgBlue}[!] Utilizar typescript? (S/n) `)
        ts.toLocaleLowerCase()

        if(!ts || ts === 's'){
            presets.push('ts')
        }

        const tw = readlineSync.question(`[!] Utilizar Tailwind? (S/n) `)

        tw.toLocaleLowerCase()

        if(!tw || tw === 's'){
            presets.push('tw')
        }

        return presets
    }

    generate () {
        const presets = this.presets()

        const name = readlineSync.question('[!] Nome do projeto: (meu-projeto-react) ')
        console.log(this.Reset)

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
                console.log(`${this.FgGreen}TailwindCSS instalado com sucesso...`)
                console.log(`${this.FgGreen}Arquivo de configuração padrão criado com sucesso...`)
                console.log(this.Reset)
            })
        })
    }
}


module.exports = new Create()