namespace FuelPrices.ORS.Models.Directions;

public class GetDirectionsInputModel
{
    public float StartLat { get; set; }
    public float StartLng { get; set; }
    public float EndLat { get; set; }
    public float EndLng { get; set; }
}