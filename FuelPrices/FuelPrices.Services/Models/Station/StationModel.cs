using FuelPrices.Services.Models.Fuel;

namespace FuelPrices.Services.Models.Station;

public class StationModel
{
    public string Name { get; set; } = string.Empty;
    public float Latitude { get; set; }
    public float Longitude { get; set; }

    public decimal DistanceToStation { get; set; }

    public FuelModel[] Fuels { get; set; } = Array.Empty<FuelModel>();
}
