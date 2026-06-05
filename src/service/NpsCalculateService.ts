export class NpsCalculateService {
    execute(answers: number[]): { detractors: number, passives: number, promoters: number, totalAnswers: number, nps: number } {
        const detractors = answers.filter(value => value >= 0 && value <= 6).length;
        const passives = answers.filter(value => value >= 7 && value <= 8).length;
        const promoters = answers.filter(value => value >= 9 && value <= 10).length;

        const totalAnswers = answers.length;
        
        let nps = 0;
        if (totalAnswers > 0) {
            nps = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));
        }

        return {
            detractors,
            passives,
            promoters,
            totalAnswers,
            nps
        };
    }
}
