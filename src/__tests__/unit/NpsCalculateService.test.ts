import { NpsCalculateService } from "../../service/NpsCalculateService";

describe("NpsCalculateService", () => {
    it("should accurately calculate the NPS", () => {
        const npsCalculateService = new NpsCalculateService();

        // 3 promoters (9, 10), 2 passives (7, 8), 1 detractor (5)
        const answers = [9, 10, 10, 8, 7, 5];
        
        const result = npsCalculateService.execute(answers);

        expect(result.totalAnswers).toBe(6);
        expect(result.promoters).toBe(3);
        expect(result.passives).toBe(2);
        expect(result.detractors).toBe(1);

        // NPS = ((promoters - detractors) / totalAnswers) * 100
        // NPS = ((3 - 1) / 6) * 100 = (2 / 6) * 100 = 33.33
        expect(result.nps).toBe(33.33);
    });

    it("should return NPS as 0 when there are no answers", () => {
        const npsCalculateService = new NpsCalculateService();

        const answers: number[] = [];
        
        const result = npsCalculateService.execute(answers);

        expect(result.totalAnswers).toBe(0);
        expect(result.promoters).toBe(0);
        expect(result.passives).toBe(0);
        expect(result.detractors).toBe(0);
        expect(result.nps).toBe(0);
    });

    it("should return NPS as 100 when all answers are promoters", () => {
        const npsCalculateService = new NpsCalculateService();

        const answers = [9, 10, 9, 10];
        
        const result = npsCalculateService.execute(answers);

        expect(result.totalAnswers).toBe(4);
        expect(result.promoters).toBe(4);
        expect(result.passives).toBe(0);
        expect(result.detractors).toBe(0);
        expect(result.nps).toBe(100);
    });

    it("should return NPS as -100 when all answers are detractors", () => {
        const npsCalculateService = new NpsCalculateService();

        const answers = [0, 1, 2, 3];
        
        const result = npsCalculateService.execute(answers);

        expect(result.totalAnswers).toBe(4);
        expect(result.promoters).toBe(0);
        expect(result.passives).toBe(0);
        expect(result.detractors).toBe(4);
        expect(result.nps).toBe(-100);
    });
});
