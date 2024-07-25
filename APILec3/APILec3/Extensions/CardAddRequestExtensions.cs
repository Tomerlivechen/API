using APILec3.DTOs.Card;
using APILec3.Models;

namespace APILec3.Extensions
{
    public static class CardAddRequestExtensions
    {
        public static Card toModel(this ClassAddRequest classAddRequest, string userId)
        {
            return new Card
            {
                user_id = userId,
                title = classAddRequest.title,
                subtitle = classAddRequest.subtitle,
                description = classAddRequest.description,
                phone = classAddRequest.phone, 
                email = classAddRequest.email,
                web = classAddRequest.web,
                image = classAddRequest.image,
                address = classAddRequest.address,
            };
        }
    }
}
