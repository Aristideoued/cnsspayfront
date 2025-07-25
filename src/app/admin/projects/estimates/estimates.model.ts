export class Estimates {
  id: number;
  estimateId: string;
  clientName: string;
  email: string;
  mobile: string;
  estDate: string;
  expDate: string;
  country: string;
  amount: string;
  status: string;
  details: string;
  constructor(estimates: Estimates) {
    {
      this.id = estimates.id || this.getRandomID();
      this.estimateId = estimates.estimateId || '';
      this.clientName = estimates.clientName || '';
      this.email = estimates.email || '';
      this.mobile = estimates.mobile || '';
      this.estDate = estimates.estDate || '';
      this.country = estimates.country || '';
      this.amount = estimates.amount || '';
      this.expDate = estimates.expDate || '';
      this.status = estimates.status || '';
      this.details = estimates.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
