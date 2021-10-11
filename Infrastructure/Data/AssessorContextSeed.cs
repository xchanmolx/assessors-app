using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class AssessorContextSeed
    {
         public static async Task SeedAsync(AssessorContext context, ILoggerFactory loggerFactory)
         {
             try
             {
                 if (!context.TaxDecOfRealProperties.Any())
                 {
                     var propertiesData = File.ReadAllText("../Infrastructure/Data/SeedData/realProperties.json");

                     var properties = JsonSerializer.Deserialize<List<TaxDecOfRealProperty>>(propertiesData);

                     foreach (var item in properties)
                     {
                         context.TaxDecOfRealProperties.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }

                 if (!context.Photos.Any())
                 {
                     var propertyPhotos = File.ReadAllText("../Infrastructure/Data/SeedData/realPropertyPhotos.json");

                     var photos = JsonSerializer.Deserialize<List<Photo>>(propertyPhotos);

                     foreach (var item in photos)
                     {
                         context.Photos.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }
             }
             catch (Exception ex)
             {
                 var logger = loggerFactory.CreateLogger<AssessorContextSeed>();
                 logger.LogError(ex.Message);
             }
         }
    }
}