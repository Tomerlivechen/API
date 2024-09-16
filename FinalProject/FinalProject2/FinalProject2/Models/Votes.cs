namespace FinalProject2.Models
{
    public class Votes
    {
        public int Id { get; set; }
        public User Voter { get; set; }

        public int Voted {  get; set; }    
    }
}
