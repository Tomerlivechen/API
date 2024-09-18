namespace FinalProject3.Models
{
    public class Votes
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public User Voter { get; set; }

        public int Voted {  get; set; }    
    }
}
