"use client";
import { Section } from  "../components/commonComponents";
import { Profile } from "../Types";

interface props {
    profile:Profile,
    setProfile: React.Dispatch<React.SetStateAction<Profile>>
}
function ReviewsTab({profile,setProfile}:props) {
  return (
        <div>
            <Section>
                <h3 className="text-lg font-semibold text-black">
                  Reviews from Trip Mates
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  4.9 Based on {profile.reviews.length} reviews
                </p>

                {(() => {
                  const showAll = profile.showAllReviews;
                  const reviews = showAll
                    ? profile.reviews
                    : profile.reviews.slice(0, 2);

                  return (
                    <>
                      <div className="mt-6 space-y-6">
                        {reviews.map((r) => (
                          <div
                            key={r.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={r.image}
                                alt={r.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />

                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <p className="font-semibold">{r.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {r.title}
                                    </p>
                                  </div>

                                  <div className="text-sm font-semibold text-yellow-500 flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span key={i}>★</span>
                                    ))}
                                  </div>
                                </div>

                                <p className="mt-3 text-gray-700">
                                  {r.text}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  {r.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                  {r.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {!showAll && profile.reviews.length > 2 && (
                          <div className="text-center">
                            <button
                              onClick={() =>
                                setProfile((prev) => ({
                                  ...prev,
                                  showAllReviews: true,
                                }))
                              }
                              className="px-4 py-2 border rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
                            >
                              Load More Reviews
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
            </Section>
        </div>
  );
}

export default ReviewsTab;
