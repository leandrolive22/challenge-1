import { cpf } from 'cpf-cnpj-validator';
import { injectable } from "tsyringe";
import { AppError } from '../../../shared/errors/AppError';

@injectable()
class ChallengeService {
    async convertMoneyDataToBrasilianFormat(value: Number){
        let Real = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }); 
        const valueFormated = `${Real.format(value)}`;
        return (valueFormated);
    }

    async verifyCnpjOrCpfIsValid(value: any){
        const cnpjOrCpf = cpf.isValid(value);
        return (cnpjOrCpf);
    }

    async validationTotalValueAndInstallments(installmentes: any, totalValue: any, installmentValue: any, vlMoviment: any, vlPag: any){
        let totalAmountDivided = totalValue / installmentes;
        let validationStatus : boolean = false;

        if(totalAmountDivided === installmentValue){
            validationStatus = true;
        }

        if(parseInt(vlMoviment) > parseInt(vlPag)){
            throw new AppError("O Pagamento está inconsistente!", 400);
        }
        
        return (validationStatus);
    }

    async readCsv(): Promise<any> {
        var fs = require('fs');
        const csv = require('csv-parser')
        const results: any[] = [];

        fs.createReadStream('data.csv')
        .pipe(csv([
            'vlTotal', 'vlPresta', 'vlMora', 'nrCpfCnpj', 'qtPrestacoes', 'vlMovimento', 'vlPag'
        ]))
        .on('data', (data: any) => results.push(data))
        .on('end', async () => {

            // Converting values ​​to Brazil format \\
            console.log(await this.convertMoneyDataToBrasilianFormat(results[100].vlTotal));
            console.log(await this.convertMoneyDataToBrasilianFormat(results[100].vlPresta));
            console.log(await this.convertMoneyDataToBrasilianFormat(results[100].vlMora));
            
            // Validating CPF OR CNPJ \\
            console.log(await this.verifyCnpjOrCpfIsValid(results[150].nrCpfCnpj))

            // Validating Total Valye And Installments \\
            console.log(
                await this.validationTotalValueAndInstallments(
                    results[150].qtPrestacoes, results[150].vlTotal, results[150].vlPresta, results[150].vlMovimento, results[150].vlPag
                )
            );
        });

        return (200);
    }
}

export { ChallengeService };
