using System.Collections.Generic;

namespace API.Helpers
{
    public class OwnerNamePhotos<T> where T: class
    {
        public OwnerNamePhotos(string ownerName, IEnumerable<T> photos)
        {
            OwnerName = ownerName;
            Photos = photos;
        }

        public string OwnerName { get; set; }
        public IEnumerable<T> Photos { get; set; }
    }
}