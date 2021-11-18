using System.Collections.Generic;

namespace API.Helpers
{
    public class OwnerNamePhotos<T> where T: class
    {
        public OwnerNamePhotos(string owner, IEnumerable<T> photos)
        {
            Owner = owner;
            Photos = photos;
        }

        public string Owner { get; set; }
        public IEnumerable<T> Photos { get; set; }
    }
}