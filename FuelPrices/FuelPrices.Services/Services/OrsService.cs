using FuelPrices.ORS.Client;
using FuelPrices.ORS.Models.Directions;

namespace FuelPrices.Services.Services;

public class OrsService
{
    private readonly OrsClient _orsClient;

    public OrsService(
        OrsClient orsClient
        )
    {
        _orsClient = orsClient;
    }

    public async Task<decimal> GetDistanceAsync(
        float startLat,
        float startLng,
        float endLat,
        float endLng
        )
    {
        var model = new GetDirectionsInputModel
        {
            StartLat = startLat,
            StartLng = startLng,
            EndLat = endLat,
            EndLng = endLng
        };

        var result = await _orsClient.GetDirectionsAsync(model);

        return result?.Features.FirstOrDefault()?.Properties?.Summary?.Distance ?? 0;
    }
}