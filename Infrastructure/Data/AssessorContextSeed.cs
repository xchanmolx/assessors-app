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

                 if (!context.AgriculturalLands.Any())
                 {
                     var agriLandData = File.ReadAllText("../Infrastructure/Data/SeedData/agriculturalLand.json");

                     var agriLands = JsonSerializer.Deserialize<List<AgriculturalLand>>(agriLandData);

                     foreach (var item in agriLands)
                     {
                         context.AgriculturalLands.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }

                 if (!context.ResidentialLands.Any())
                 {
                     var residentialLandData = File.ReadAllText("../Infrastructure/Data/SeedData/residentialLand.json");

                     var residentialLands = JsonSerializer.Deserialize<List<ResidentialLand>>(residentialLandData);

                     foreach (var item in residentialLands)
                     {
                         context.ResidentialLands.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }

                 if (!context.CommercialLands.Any())
                 {
                     var commercialLandData = File.ReadAllText("../Infrastructure/Data/SeedData/commercialLand.json");

                     var commercialLands = JsonSerializer.Deserialize<List<CommercialLand>>(commercialLandData);

                     foreach (var item in commercialLands)
                     {
                         context.CommercialLands.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }

                 if (!context.IndustrialLands.Any())
                 {
                     var industrialLandData = File.ReadAllText("../Infrastructure/Data/SeedData/industrialLand.json");

                     var industrialLands = JsonSerializer.Deserialize<List<IndustrialLand>>(industrialLandData);

                     foreach (var item in industrialLands)
                     {
                         context.IndustrialLands.Add(item);
                     }

                     await context.SaveChangesAsync();
                 }

                 if (!context.Barangays.Any())
                 {
                     var barangayData = File.ReadAllText("../Infrastructure/Data/SeedData/barangay.json");

                     var barangays = JsonSerializer.Deserialize<List<Barangay>>(barangayData);

                     foreach (var item in barangays)
                     {
                         context.Barangays.Add(item);
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