namespace FinalProject1.Models
{
    public class Comment : Interaction
    {
        public  Post? ParentPost { get; set; }

        public Comment? ParentComment { get; set; }

        public List<Comment>? Comments { get; set; } = new List<Comment>();
    }
}
